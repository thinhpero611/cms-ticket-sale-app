import React from 'react';
// styles
import './styles/styles.scss'
import "./shared/assets/css/bootstrap.min.css"
import "antd/dist/antd.css"
// component
import PublicPage from './router/component/PublicPage';

const App = () => {
  console.log("render public page")
  return (
    <PublicPage />
  );
}

export default App;
