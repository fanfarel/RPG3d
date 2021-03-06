import { GeometryResourcesMap, Level, TileConfig } from "../types";
import { repeat } from "../classes/utils";
import { DEMO_02 } from "./DEMO_02";

export const DEMO_01: Level = {
    map: `
           T   TTT T T    TTT TT TTTTT T TTT T T TT    T TTT T T

        wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww
     T  w______________________________________________________w   T
    T   w_____________T________________________________________w   T
    T   w__FFFFFFFFFFFFF_FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFwww
        w__pAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAET
     T  w__pFFwwwwAAAAAAAwFFFFFFpFFFFFFFFFFFFFFpFFFFFFwAAAAAAAAwww
    T   w__p__w  wFFFAwFFF______p__________f___pf_____fAAAAAAAABBBBB
     T  w__p__wwww___Af_________p__________f___pf_____fAAAAAAAAB
     T  w__p_________Af_________p__________f___pf_____fAAAAAAAAB
     T  w__p_________Af_________p____T_____f_T_pf____wwwwEwEwEwB
    TT  w__ppppppppppAf_________p__T_TT_T_wFFFFpFFFFFw__BBBBBBBBBBBBB
    T   w_______T_T__Af____T____p_________fAAAAAAAAAAf_TB
    T   w_______T_T__Af____T____p_________fAAAAABBBBAf__B
     T  w___T__T___T_Af_________p__T____T_fAAAAAB  BAf__B
     wwww____________AppppppppppppppppppppfAAAAAD  BAfT_B
     wAAAAAAAAAAAAAAAAf___p_____p___T___T_fAAAAAD  BAf__B
     wwww__________wwwwww_p_____p_T_____T_fAAAAAB  BAf__B 
     T  wFFw_T_____fppppppp_____p___T_T_T_fAAAAABBBBAf__B
     T  wppf_T_____fppppppp_____p___T_T_T_fAAAAAAAAAAf__B
    T   wppf__T____fppppf_______p_______T_wFFpwFFFFFFw__B
     T  w__f____________f_______ppppppppppppppf_________B
        wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwB
      TT        
    TTTTTT  TTTTTTTT   TTTT TTTTT TTTTTTTTT   TTT   TTT  T T TTT TT T

    L                   L                       L                   L   
    `,
    configs: {
        E: {
            includes: ['w'],
            tileConfig: [{geometry: ['door_decale'], yShift: () => -1}],
            action: function () {
                this.getRenderer().changeLevel(DEMO_02, {spawnPosition: {x: 17, y: 9}});
            }
        },
        D: {
            includes: ['B'],
            tileConfig: [{geometry: ['door_decale'], yShift: () => -2}],
        },
        '@': {
            includes: ['A'],
            tileConfig: [],
        },
        'w': {
            tileConfig: [
                {geometry: ['asphalt'], yShift: () => .2, size: 1.1},
                {geometry: ['wall']},
            ]
        },
        'L': {
            includes: ['_'],
            tileConfig: [],
        },
        'f': {
            includes: ['_'],
            tileConfig: [
                {yShift: () => -0.62, geometry: ['fence'], size: 1},
            ]
        },
        F: {
            includes: ['_'],
            tileConfig: [
                {yShift: () => -0.62, geometry: ['fence'], size: 1, facing: () => 90},
            ]
        },
        '_': {
            tileConfig: [
                {isWalkable: true, geometry: ['dirt'], yShift: () => Math.random() / 8},
                {
                    yShift: () => -0.4,
                    isWalkable: true,
                    geometry: [
                        ...repeat<keyof GeometryResourcesMap>('grass_01', 30),
                        ...repeat<keyof GeometryResourcesMap>('grass_02', 30),
                        ...repeat<keyof GeometryResourcesMap>('grass_03', 10),
                        ...repeat<keyof GeometryResourcesMap>('grass_04', 2),
                        'bush',
                        // 'bush_02',
                    ],
                    size: 0.12,
                    isHairy: true,
                    facing: () => Math.random() * 360,
                },
            ]
        },
        p: {
            tileConfig: [
                {geometry: ['asphalt'], isWalkable: true},
            ]
        },
        'T': {
            includes: ['_'],
            tileConfig: [
                {
                    geometry: ['tree_01', 'tree_02', 'tree_03', 'tree_04'],
                    yShift: () => 0,
                    size: 2,
                    isWalkable: true,
                    facing: () => Math.random() * 360,
                }
            ]
        },
        'A': {
            tileConfig: [
                {geometry: ['asphalt'], yShift: () => 0.05, isWalkable: true},
            ]
        },
        'B': {
            tileConfig : [
                {geometry: ['asphalt'], yShift: () => 0.2, size: 1.1},
                ...repeat<TileConfig>({geometry: ['wall']}, 3),
                {geometry: ['window_decale'], yShift: () => -2},
            ]
        }
    }
}