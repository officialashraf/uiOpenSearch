import React from 'react'
import {useSelector} from 'react-redux'
import {ListAltOutlined, PieChart, MoreVert} from '@mui/icons-material';
import '../../../../../Assets/Stlyes/tabulerHeader.css'
const CaseHeader = ({ onIconClick }) => {
  const caseData1 = useSelector((state) => state.caseData.caseData);
  return (
    <>
    <div className='row header-row' style={{background: 'darkgray', color:'white',display: 'flex', marginLeft: '0rem', marginRight: '0rem', height:"40px"}} >
        <div className='col ' >
            <h5 className="header-caseid-h7" >Case id: {caseData1.id}</h5>
            <p className='header-casename-h5' >{caseData1.title}</p>
        </div>
        <div className='col d-flex justify-content-center align-items-center'>
              <button className="add-new-filter-button ">Resources</button>
              <button className="add-new-filter-button" style={{marginLeft:'12px'}}>Case board</button>
        </div>
        <div className='col d-flex justify-content-end align-items-center' >
            <button className="add-new-filter-button ">  Back to Case Snapshot</button>
        </div>
    </div>
    {                             /*end header*/                                     }
    <div className="row mt-1 ms-1">
  <div className="col-md-auto">
    <input type="text" className="form-control form-control-sm search-bar-f-option" placeholder="Search..." />
  </div>
  <div className="col-md-auto">
  <ListAltOutlined/>
  </div>

  <div className="col-md-auto">
    <select className="form-select header-dropdown1" style={{fontSize:"12px" }} >
      <option value="source1">Smart Insights</option>
      <option value="source2">Options</option>
    </select>
  </div>
  <div className="col-auto ms-auto ml-3 d-flex justify-content-center align-items-center"  style={{backgroundColor :"black", marginRight:"15px", height:"30px"}}>
      <PieChart className="icon-style" onClick={() => onIconClick('graphicalData')} />
      <ListAltOutlined className="icon-style" onClick={() => onIconClick('caseData')} />
         <MoreVert  fontSize="inherit" sx={{ color: "white", '&:hover': { color: "gray" } }} />
  </div>
</div>
    </>
  )
}


export default CaseHeader
