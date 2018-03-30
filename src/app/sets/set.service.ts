import { Injectable } from '@angular/core';

import { ISet } from './set';

@Injectable()
export class SetService {

    getSets(): ISet[] {
        return [
            {
                "setNumber": "70612-1",
                "name": "Green Ninja Mech Dragon",
                "themeId": 616,
                "theme": "Ninjago > Ninjago The Movie",
                "setImageUrl": "https://m.rebrickable.com/media/sets/70612-1.jpg"
            },
            {
                "setNumber": "70614-1",
                "name": "Lightning Jet",
                "themeId": 616,
                "theme": "Ninjago > Ninjago The Movie",
                "setImageUrl": "https://m.rebrickable.com/media/sets/70614-1.jpg"
            },
            {
                "setNumber": "70608-1",
                "name": "Master Falls",
                "themeId": 616,
                "theme": "Ninjago > Ninjago The Movie",
                "setImageUrl": "https://m.rebrickable.com/media/sets/70608-1.jpg"
            },
            {
                "setNumber": "70611-1",
                "name": "Water Strider",
                "themeId": 616,
                "theme": "Ninjago > Ninjago The Movie",
                "setImageUrl": "https://m.rebrickable.com/media/sets/70611-1.jpg"
            },
            {
                "setNumber": "70656-1",
                "name": "garmadon, Garmadon, GARMADON!",
                "themeId": 435,
                "theme": "Ninjago",
                "setImageUrl": "https://m.rebrickable.com/media/sets/70656-1.jpg"
            }
        ]
    }
}