import './App.css';
import LandingPage from './components/LandingPage/LandingPage';
import Home from './components/Home/Home';
import PokemonCreate from './components/PokemonCreate/PokemonCreate';
import PokemonDetail from './components/PokemonDetail/PokemonDetail';
import { Route, Switch } from 'react-router-dom';
import PokemonCreado from './components/PokemonCreado/PokemonCreado';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path='/' component={LandingPage} />
        <Route exact path='/home' component={Home} />
        <Route exact path='/home/create' component={PokemonCreate} />
        <Route exact path='/home/pokemon/:pokemonId' component={PokemonDetail} />
        <Route exact path='/home/successCreate' component={PokemonCreado} />
        <Route exact path='*' component={LandingPage} />
      </Switch>
    </div>
  );
}

export default App;
