"use client"

interface ContainerProps {
    children : React.ReactNode;
}

const Container:React.FC<ContainerProps> = ({
    children
}) => {
    return ( 
        <div className="relative max-w-[2520] mx-auto xl:px-10 md:mx-10 sm:px-2 px-4">
            {children}
        </div>
    );
}
 
export default Container;