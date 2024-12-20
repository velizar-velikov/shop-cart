import Container from 'react-bootstrap/esm/Container.js';
import Header from './components/header/Header.jsx';
import Login from './components/login/Login.jsx';
import Register from './components/register/Register.jsx';
import Footer from './components/footer/Footer.jsx';
import Create from './components/create/Create.jsx';

{
    /* <Login /> */
}
function App() {
    return (
        <div className="d-flex flex-column min-vh-100">
            <Header />
            <main>
                <Create />
            </main>
            <Footer />
        </div>
    );
}

export default App;
