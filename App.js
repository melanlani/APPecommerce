import {createStackNavigator, createAppContainer} from 'react-navigation';
import HomeScreen from './HomeScreen'
import ProductDetail from './ProductDetail'
import ListCart from './ListCart'
import Cart from './Cart'

const MainNavigator = createStackNavigator({
  Home: {screen: HomeScreen},
  Detail: {screen: ProductDetail},
  ListCart: {screen: ListCart},
  Cart: {screen: Cart},
});

const App = createAppContainer(MainNavigator);

export default App;
