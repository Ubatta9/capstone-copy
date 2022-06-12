
import './App.css';
import {useSelector} from "react-redux";
import Homepage from "./components/HomePage";
import {Container} from "react-bootstrap";


function App({_useSelector = useSelector, HomepageC = Homepage}) {
  return <Container>
    <HomepageC/>
  </Container>
}

export default App;
