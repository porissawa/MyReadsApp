import React from 'react'
import ReactDOM from 'react-dom'
import Container from './MyBooks'
import {BrowserRouter} from 'react-router-dom'
import './index.css'

ReactDOM.render(
<BrowserRouter>
    <Container />
</BrowserRouter>, document.getElementById('root'))
