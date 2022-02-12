import React from 'react'
import { Switch } from 'react-router-dom'
import Layout from '../../layout'
import { publicRouter } from '../index'
import ShowRouter from './ShowRouter'

const PublicPage: React.FC = () => {
  return (
    <Switch>{ShowRouter({ routers: publicRouter, MasterLayout: Layout})}</Switch>
  )
}

export default PublicPage