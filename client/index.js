const root = document.getElementById('root');

render();

async function render() {
  const calls = await fetch('http://localhost:3000/');
  console.log(calls);
}