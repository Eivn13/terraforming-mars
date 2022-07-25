import {expect} from 'chai';
import {ImportedGHG} from '../../../src/cards/base/ImportedGHG';
import {Game} from '../../../src/Game';
import {Resources} from '../../../src/common/Resources';
import {TestPlayers} from '../../TestPlayer';

describe('ImportedGHG', function() {
  it('Should play', function() {
    const card = new ImportedGHG();
    const player = TestPlayers.BLUE.newPlayer();
    const redPlayer = TestPlayers.RED.newPlayer();
    Game.newInstance('gameid', [player, redPlayer], player);
    const action = card.play(player);
    expect(action).is.undefined;
    expect(player.getProduction(Resources.HEAT)).to.eq(1);
    expect(player.heat).to.eq(3);
  });
});
