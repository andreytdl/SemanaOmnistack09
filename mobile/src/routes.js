//Swith navigator para que quando o usuario mudar de tela a tela anterior deixe de existir (Evita a navegação em pilha - ficar crindo telas ativas debaixo das outras anteriores)
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import Login from './pages/Login';
import List from './pages/List';
import Book from './pages/Book';

const Routes = createAppContainer(
    createSwitchNavigator({
        Login,
        List,
        Book
    })
);

export default Routes;