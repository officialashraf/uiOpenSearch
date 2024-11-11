<div className="search-results">
{filteredResults.length > 0 ? (
  <table className="results-table">
    <thead>
      <tr>
        <th>S.No.</th>
        <th>Name</th>
        <th>Email</th>
        <th>Phone</th>
      </tr>
    </thead>
    <tbody>
      {filteredResults.map((result) => (
        <tr key={result.id}>
            <td>{result.id}</td>
          <td>{result.name}</td>
          <td>{result.email}</td>
          <td>{result.phone}</td>
        </tr>
      ))}
    </tbody>
  </table>

) : (
  <p>No results found</p>
)}
<button className="create-case-button">Create Case</button>
</div>