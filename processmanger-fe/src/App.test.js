import { render, screen } from '@testing-library/react';
import App from './App';
import Homepage from "./components/HomePage";

test('renders the Homepage', () => {
  const expectedHomepage = 'This is Home Page';
  const mockHomepage =() => <div>{expectedHomepage}</div>
  render(<App HomepageC={mockHomepage}/>);

});
