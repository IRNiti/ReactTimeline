/**
 * Takes an array of items and assigns them to lanes based on start/end dates.
 * @returns an array of arrays containing items.
 */
export default function assignLanes(items) {
  const sortedItems = items.sort((a, b) =>
    new Date(a.start) - new Date(b.start)
  );
  const lanes = [];

  function assignItemToLane(item) {
    for (const lane of lanes) {
      if (new Date(lane[lane.length - 1].end) < new Date(item.start)) {
        lane.push(item);
        return;
      }
    }
    lanes.push([item]);
  }

  let minDate;

  for (const item of sortedItems){
    if(minDate){
      const currentDate = new Date(item.start);
      minDate = (minDate < currentDate) ? minDate : currentDate;
    } else {
      minDate = new Date(item.start);
    }
  }

  for (const item of sortedItems) {
    item['startIndex'] = (new Date(item.start) - minDate)/(1000*60*60*24);
    item['endIndex'] = (new Date(item.end) - minDate)/(1000*60*60*24);
    assignItemToLane(item);
  }

  for (let items of lanes){
    items.forEach((item, i) => {
      let margin = 0;
      if(i != 0){
        margin = (new Date(item.start) - new Date(items[i-1].start))/(1000*60*60*24);
      }
      item['margin'] = margin;
    });
  }
  return lanes;
}
