import React, { Component } from 'react';
import './layout.css';
import { Header } from '../header/header';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Container } from '@material-ui/core';

import Routing from '../Routing/Routing';


export class Layout extends Component {
    public render(): JSX.Element {
        return (
            <div className='layout'>
                <BrowserRouter>
                    <header>
                        <Header />
                    </header>
                    <main>
                        <Container>
                        <Routing/>
                        </Container>
                    </main>
                </BrowserRouter>
            </div>
        );
    }
}