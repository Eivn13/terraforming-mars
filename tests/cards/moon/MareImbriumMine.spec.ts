import {Game} from '../../../src/Game';
import {IMoonData} from '../../../src/moon/IMoonData';
import {MoonExpansion} from '../../../src/moon/MoonExpansion';
import {Player} from '../../../src/Player';
import {setCustomGameOptions} from '../../TestingUtils';
import {TestPlayers} from '../../TestPlayer';
import {MareImbriumMine} from '../../../src/cards/moon/MareImbriumMine';
import {expect} from 'chai';
import {Resources} from '../../../src/common/Resources';
import {MoonSpaces} from '../../../src/moon/MoonSpaces';
import {TileType} from '../../../src/common/TileType';

const MOON_OPTIONS = setCustomGameOptions({moonExpansion: true});

describe('MareImbriumMine', () => {
  let game: Game;
  let player: Player;
  let moonData: IMoonData;
  let card: MareImbriumMine;

  beforeEach(() => {
    player = TestPlayers.BLUE.newPlayer();
    game = Game.newInstance('gameid', [player], player, MOON_OPTIONS);
    moonData = MoonExpansion.moonData(game);
    card = new MareImbriumMine();
  });

  it('can play', () => {
    // TODO: Ensuring resources is going to require changes coming later.
  });

  it('play', () => {
    player.titanium = 3;
    expect(player.getProduction(Resources.STEEL)).eq(0);
    expect(player.getTerraformRating()).eq(14);
    expect(moonData.miningRate).eq(0);

    card.play(player);

    expect(player.titanium).eq(2);
    expect(player.getProduction(Resources.STEEL)).eq(1);
    expect(player.getProduction(Resources.TITANIUM)).eq(1);
    expect(player.getTerraformRating()).eq(15);
    expect(moonData.miningRate).eq(1);

    const mareImbrium = moonData.moon.getSpace(MoonSpaces.MARE_IMBRIUM);
    expect(mareImbrium.player).eq(player);
    expect(mareImbrium.tile!.tileType).eq(TileType.MOON_MINE);
  });
});

