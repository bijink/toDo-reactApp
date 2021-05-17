import './App.css'
import Header from './Componets/Header'
function App() {
  const name = 'Bijin';
  return (
    <div>
      <Header name={name} />
      <h1 style={{ color: 'blue' }} >Hello Gays!!!</h1>
      <h1 className='hello' >Hello Gays!!!</h1>
      <div>Hello</div>
    </div>
  );
}

export default App;
