export default function Modal(props: {isOpen: boolean; onClose:()=> void, children : React.ReactNode}){
    if(!props.isOpen) return null;
    return <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
        <div className="bg-white relativebg-white rounded-lg p-6 max-w-md relative shadow-lg">
            {props.children}
        </div>
    </div>
}