export interface ISetPart {
    "id": number;
    "color": string;
    "elementId": number;
    "name": string;
    "partImageUrl": string;
    "partNumber": string;
    "partUrl": string;
    "setNumber": string;
    "quantityFound": number;
    "quantityFoundDateChanged": Date;
    "quantityNeeded": number;
    "quantityRemaining": number; //number of parts remaining to find
    "categoryId": number;
    "categoryName": string;
    "groupName": string;
}