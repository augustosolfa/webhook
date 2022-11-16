const root = document.getElementById("root");

render();

async function render() {
  const calls = await fetch("/api/calls").then((response) =>
    response.json()
  );
  calls.sort((a, b) => b.time - a.time);
  for (let index in calls) {
    const call = calls[index];
    const row = document.createElement("div");
    row.classList = 'row';
    
    const pTime = document.createElement('p');
    pTime.classList = 'time';
    pTime.innerText = new Date(call.time - (60*60*3*1000)).toISOString();
    row.appendChild(pTime);
    const pPath = document.createElement('p');
    pPath.classList = 'path';
    pPath.innerText = call.path;
    row.appendChild(pPath);
    const pBody = document.createElement('p');
    pBody.classList = 'body';
    pBody.innerText = JSON.stringify(call.body, null, 1);
    row.appendChild(pBody);

    root.appendChild(row);
  }
}
