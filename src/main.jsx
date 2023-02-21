
import React from 'react'
import ReactDOM from 'react-dom/client'
import InitMetaX from './InitMetaX'
import './index.css'
import { Amplify } from "aws-amplify";
import awsExports from "./aws-exports";

Amplify.configure(awsExports);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <InitMetaX />
  </React.StrictMode>,
)
