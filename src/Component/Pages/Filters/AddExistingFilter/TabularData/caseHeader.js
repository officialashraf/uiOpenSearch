import React from 'react'

const CaseHeader = () => {
  return (
    <>
    <div className='row header-row' style={{background: 'darkgray', color:'white',display: 'flex', marginLeft: '0rem', marginRight: '0rem'}} >
        <div className='col ' >
            <h7 className="header-caseid-h7" >Case id: {"456884"}</h7>
            <h5 className='header-casename-h5' >Rameshwaram Cafe Blast</h5>
        </div>
        <div className='col d-flex justify-content-center mt-2 mb-2' >
    
          
          
              <button className="btn btn-secondary mx-2">Summary</button>
            
            
              <button className="btn btn-secondary mx-2">Resources</button>
   
            
              <button className="btn btn-secondary mx-2">Case board</button>
            
      
        </div>
        <div className='col mt-2 mb-2'style={{ display: 'flex', justifyContent: 'flex-end' }} >
       
            <button className="btn btn-secondary ">  Back to Case Snapshot</button>
        </div>
    </div>
    {                             /*end header*/                                     }
    <div className="row mt-3 ms-2" style={{background:'gray'}} >
      <div className="col-md-auto">                
                <input
                type="text"
                className="form-control form-control-sm search-bar-f-option"
                placeholder="Search..."
                /></div>
      <div className="col-md-auto">
        <button className="btn btn-sm" ><i className="fas fa-sliders" ></i></button>
      </div>
      <div className="col-md-auto">
      <select className="form-select header-dropdown1">
        <option value="source1" >Smart Insights</option>
        <option value="source2">Options</option>
      </select>
      </div>
      
      <div className="col"> 
      <button className="float-end header-three-dots" ><i className='fas fa-ellipsis-v'></i></button>
      <ul className="pagination float-end">
          <li className="page-item header-li">
            <button className="page-link header-li-button"><i className="fas fa-pie-chart" ></i></button>
          </li>
          <li className="page-item header-li">
            <button className="page-link header-li-button"><i className="fas fa-table" ></i></button>
          </li>
      </ul>
      </div>
    </div>
    </>
  )
}


export default CaseHeader
