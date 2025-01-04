import React from 'react'

const CaseHeader = () => {
  return (
    <>
    <div className='row header-row' >
        <div className='col mt-4' >
            <h7 className="header-caseid-h7" >Case id: {"456884"}</h7>
            <h5 className='header-casename-h5' >Rameshwaram Cafe Blast</h5>
        </div>
        <div className='col d-flex justify-content-center mt-4' >
        <ul className="pagination">
          
            <li className="page-item header-li">
              <button className="page-link header-li-button">summary</button>
            </li>
            <li className="page-item header-li">
              <button className="page-link header-li-button">resources</button>
            </li>
            <li className="page-item header-li">
              <button className="page-link header-li-button">case board</button>
            </li>
        </ul>
        </div>
        <div className='col mt-4' >
            <button className='btn float-end header-btcs-button' >back to case snapshot</button>
        </div>
    </div>
    {                             /*end header*/                                     }
    <div className="row mt-3 ms-2" >
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
        <option value="source1" >smart insights</option>
        <option value="source2">option2</option>
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
