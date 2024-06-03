interface HeadingProps {
    title : string;
    subtitle? : string;
    center?  : boolean;
}

const Heading:React.FC<HeadingProps> = ({
    title,
    subtitle,
    center
}) => {
    return ( 
        <div className={`${center ? "text-center" : "text-start"} mt-2`}>
            <div className="text-xl font-bold">{title}</div>
            <div className="text-sm font-light text-gray-500">{subtitle}</div>
        </div>
     );
}
 
export default Heading;