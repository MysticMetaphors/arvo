type ToastProps = {
  theme?: string,
  text?: string
}

export default function Toast({ theme, text }: ToastProps) {
  return (
    <div className="max-w-md border text-sm rounded-lg bg-gray-900 border-white/20 text-white" role="alert">
      <div id="hs-toast-soft-color-dark-label" className="flex p-4">
        <div className="shrink-0 mr-4">
          {theme == "error" ?
            <i className="fa-solid text-lg fa-circle-xmark text-red-400"></i>
            :
            <i className="fa-solid text-lg fa-circle-check text-green-500"></i>
          }
        </div>
        <p className="mr-3">{text ? text : 'Message Sent.'}</p>

        {/* <div className="ms-auto">
          <button type="button" className="inline-flex shrink-0 justify-center items-center size-5 rounded-lg opacity-50 hover:opacity-100 focus:outline-hidden focus:opacity-100 text-white" aria-label="Close">
            <span className="sr-only">Close</span>
            <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18"></path>
              <path d="m6 6 12 12"></path>
            </svg>
          </button>
        </div> */}
      </div>
    </div>
  )
}