// Icons
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ArticleIcon from "@mui/icons-material/Article";
// NextUI
import { Progress } from "@nextui-org/react";

const ReportCard = (props) => {
  const icons = {
    time: <AccessTimeIcon />,
    projects: <ArticleIcon />,
  };
  const Icon = icons[props.icon];

  return (
    <div className="flex flex-row w-full p-6 bg-card rounded-md">
      {/* Content */}
      <div className="flex flex-col gap-4 flex-1">
        <p className="font-light">{props.header}</p>
        <div className="flex flex-col gap-1">
          <p className=" text-4xl">
            {props.BAN}
            <span className="text-xl"> {props.BANlabel}</span>
          </p>
          <p className="text-sm text-text70 font-light">{props.subheader}</p>
        </div>
      </div>
      {/* Icon */}
      <div className="flex flex-col justify-between">{Icon}</div>
    </div>
  );
};

export default ReportCard;
