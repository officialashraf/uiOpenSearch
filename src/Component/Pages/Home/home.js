import React from 'react'
import Header from './header.js'
import Sidebar from './leftSideBar.js'
import CardList from './cards.js'
import '../../../Assets/Stlyes/dashboard.css'
import RightSidebar from './rightSideBar.js'
import DataTable from '../Case/caseList.js'

const Home = () => {
  return (
    <div >
      <Header />

      <div className="dashboard-container">

        <div className="cont-a">
          <Sidebar />
        </div>


        <div className="cont-b">
          <div className="row-1">
            <CardList />
          </div>
          <div className="row-2">
                
             <DataTable/> 
          </div>
        </div>


        <div className="cont-c">
        <RightSidebar/>
        </div>
      </div>
    </div>
  )
}

export default Home
