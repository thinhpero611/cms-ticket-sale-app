import React from 'react';
// styles
import './styles/styles.scss'
import "./shared/assets/css/bootstrap.min.css"
import "antd/dist/antd.css"
import "@ant-design/flowchart/dist/index.css"
// component
import PublicPage from './router/component/PublicPage';
import { ConfigProvider } from 'antd';
import 'moment/locale/vi'
import locale from 'antd/lib/locale/vi_VN'

const App = () => {
  console.log("render public page")
  return (
    <ConfigProvider locale={locale}>
      <PublicPage />
    </ConfigProvider>
  );
}

export default App;
