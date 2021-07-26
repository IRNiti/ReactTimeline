import timelineItems from "./timelineItems";

export function updateProp(item, propName) {
  for(let timelineItem of timelineItems){
    if(timelineItem.id === item.id){
      timelineItem[propName] = item[propName];
    }
  }
}