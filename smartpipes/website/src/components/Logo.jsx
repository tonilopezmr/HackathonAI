const colors = {
  white: "#ffffff",
  black: "#000000"  
}

export function Logo(props) {
  const color = props.color ? props.color : colors.black

  if(props.logo) {    
    return (    
      <>        
        <svg  aria-hidden="true" version="1.1" viewBox="0 0 75 75" {...props}>
          <defs>
            <linearGradient id="myGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#fff"/>
              <stop offset="100%" stopColor="#FEDE00"/>
            </linearGradient>
          </defs>
          <g transform="matrix(.71 -.71 .71 .71 37.5 37.5)">
            <path transform="translate(-36 -36)" d="m0.453 42.074 29.473 29.473c-15.05-2.544-26.929-14.422-29.473-29.473zm-0.453-8.001 37.927 37.927c2.219-0.118 4.423-0.441 6.583-0.965l-43.545-43.545c-0.524 2.16-0.847 4.364-0.965 6.583zm2.853-12.243 47.317 47.317c1.715-0.736 3.37-1.605 4.95-2.598l-49.669-49.669c-0.993 1.58-1.862 3.235-2.598 4.95zm5.804-9.292c6.607-7.678 16.393-12.538 27.317-12.538 19.897 0 36.026 16.13 36.026 36.026 0 10.923-4.861 20.71-12.538 27.317l-50.805-50.805z" fill={color} strokeLinecap="round" strokeWidth="0" vectorEffect="non-scaling-stroke" className="my-svg-class" />
          </g>        
        </svg>            
      </>    
    )
  }

  return (    
    <div className="flex space-x-3 items-center">
      <svg  aria-hidden="true" version="1.1" viewBox="0 0 75 75" {...props}>
          <defs>
            <linearGradient id="myGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#fff"/>
              <stop offset="100%" stopColor="#FEDE00"/>
            </linearGradient>
          </defs>
          <g transform="matrix(.71 -.71 .71 .71 37.5 37.5)">
            <path transform="translate(-36 -36)" d="m0.453 42.074 29.473 29.473c-15.05-2.544-26.929-14.422-29.473-29.473zm-0.453-8.001 37.927 37.927c2.219-0.118 4.423-0.441 6.583-0.965l-43.545-43.545c-0.524 2.16-0.847 4.364-0.965 6.583zm2.853-12.243 47.317 47.317c1.715-0.736 3.37-1.605 4.95-2.598l-49.669-49.669c-0.993 1.58-1.862 3.235-2.598 4.95zm5.804-9.292c6.607-7.678 16.393-12.538 27.317-12.538 19.897 0 36.026 16.13 36.026 36.026 0 10.923-4.861 20.71-12.538 27.317l-50.805-50.805z" fill={color} strokeLinecap="round" strokeWidth="0" vectorEffect="non-scaling-stroke" className="my-svg-class" />
          </g>        
        </svg>       
      <h2 className={"text text-xl font-bold text-white"}>Bodia</h2>      
    </div>    
  )
}
