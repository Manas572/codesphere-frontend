import { Visualization } from '@/store'
import React from 'react'
 
const Visout = () => {
  const { steps, stepno, setNextStep, setPrevStep } = Visualization()

  const currentStep = steps[stepno]

  const stepError = currentStep?.error;
  return (
    <div className='h-full flex flex-col'>
      <div className='bg-gray-900 p-2 border-b border-gray-700 flex justify-end gap-2'>
        <button
          className="rounded px-6 py-1 text-white font-semibold bg-indigo-600 disabled:opacity-50"
          onClick={setPrevStep}
          disabled={stepno === 0}
        >
          Prev
        </button>

        <button
          className="rounded px-6 py-1 text-white font-semibold bg-indigo-600 disabled:opacity-50"
          onClick={setNextStep}
          disabled={stepno === steps.length - 1}
        >
          Next
        </button>
      </div>

      {stepError && (
          <div className="bg-red-900/40 border border-red-500 p-3 rounded text-red-200 animate-pulse">
            <div className='text-xs font-bold uppercase mb-1'>Execution Error</div>
            {stepError}
          </div>
        )}
        
      <div className='flex-1 bg-[#1e1e1e] text-amber-50 p-4 font-mono text-sm overflow-auto space-y-4'>
        <div>
          <div className='text-gray-400 text-xs font-bold mb-1 uppercase'>
           Total steps are {steps.length}
          </div>
          <div className='text-gray-400 text-xs font-bold mb-1 uppercase'>
            Stdout
          </div>
          <pre className="whitespace-pre-wrap">
            {currentStep?.stdout || ''}
          </pre>
        </div>
        <div>
          <div className='text-gray-400 text-xs font-bold mb-1 uppercase'>
            Locals
          </div>
          <pre className="whitespace-pre-wrap">
            {JSON.stringify(currentStep?.locals || {}, null, 2)}
          </pre>
        </div>
        <div>
          <div className='text-gray-400 text-xs font-bold mb-1 uppercase'>
            Globals
          </div>
          <pre className="whitespace-pre-wrap">
            {JSON.stringify(currentStep?.globals || {}, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  )
}

export default Visout
