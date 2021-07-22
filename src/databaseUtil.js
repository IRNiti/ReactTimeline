import timelineItems from "./timelineItems";

export function updateName(item) {
    for(let timelineItem of timelineItems){
        if(timelineItem.id === item.id){
            timelineItem.name = item.name;
        }
    }
}