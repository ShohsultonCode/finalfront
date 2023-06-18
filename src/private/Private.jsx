import React from 'react';

const Private = () => {
   return (
      <div style={{ width: '100%', height: "100vh", zIndex: "10000", display: "flex", justifyContent: 'center', alignItems: "center", position: "absolute", top: "5px", background: "white" }}>
         <div className="con">
            <h1>404 Not Found</h1>
         </div>
      </div>
   );
};

export default Private;