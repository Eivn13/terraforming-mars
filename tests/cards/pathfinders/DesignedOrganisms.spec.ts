import {expect} from 'chai';
import {DesignedOrganisms} from '../../../src/cards/pathfinders/DesignedOrganisms';
import {Game} from '../../../src/Game';
import {TestPlayer, TestPlayers} from '../../TestPlayer';
import {Units} from '../../../src/common/Units';
import {Penguins} from '../../../src/cards/promo/Penguins';
import {Tardigrades} from '../../../src/cards/base/Tardigrades';
import {runAllActions} from '../../TestingUtils';

describe('DesignedOrganisms', function() {
  let card: DesignedOrganisms;
  let player: TestPlayer;
  let game: Game;

  beforeEach(function() {
    card = new DesignedOrganisms();
    player = TestPlayers.BLUE.newPlayer();
    game = Game.newInstance('gameid', [player], player);
    player.playedCards.push(card);
  });

  it('canPlay', function() {
    player.tagsForTest = {science: 4};
    expect(player.canPlayIgnoringCost(card)).is.false;

    player.tagsForTest = {science: 5};
    expect(player.canPlayIgnoringCost(card)).is.true;
  });

  it('play', function() {
    const tardigrades = new Tardigrades();
    const penguins = new Penguins();
    player.playedCards = [tardigrades, penguins];

    card.play(player);
    runAllActions(game);

    expect(player.plants).eq(3);
    expect(player.getProductionForTest()).eql(Units.of({plants: 2}));
    expect(tardigrades.resourceCount).eq(3);
    expect(penguins.resourceCount).eq(1);
  });
});
