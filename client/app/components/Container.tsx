"use client"

interface ContainerProps {
    children : React.ReactNode;
}

const Container:React.FC<ContainerProps> = ({
    children
}) => {
    return ( 
        <div className="relative max-w-[2520] mx-auto px-6 md:px-10 lg:px-20">
            {children}
        </div>
    );
}
 
export default Container;