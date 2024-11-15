import { StatusBar } from 'expo-status-bar';
import Home from './Home';
import * as WebBrowser from "expo-web-browser";

WebBrowser.maybeCompleteAuthSession();

export default function App() {
  return (
    <>
      <Home />
    </>
  );
}