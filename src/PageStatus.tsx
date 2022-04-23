import React, { useEffect, useState } from "react";

import { ReactComponent as OnlineIcon } from "./assets/access-point.svg";
import { ReactComponent as OnlineWithProblemsIcon } from "./assets/access-point-remove.svg";
import { ReactComponent as OfflineIcon } from "./assets/access-point-off.svg";

type PageStatusProps = {
  code: number | null;
  loading: boolean;
  text: string;
};

export const PageStatus = ({ code, loading, text }: PageStatusProps) => {
  const iconWidth = 18;
  const [lastCode, setLastCode] = useState<number | null>(null);
  let icon;

  switch (lastCode) {
    case 200:
    case 302:
      icon = <OnlineIcon width={iconWidth} fill="#c8f550" />;
      break;

    case 301:
    case 401:
    case 404:
    case 500:
      icon = <OnlineWithProblemsIcon width={iconWidth} fill="#f59850" />;
      break;

    default:
      icon = <OfflineIcon width={iconWidth} fill="#f55050" />;
      break;
  }

  useEffect(() => {
    setLastCode(code);
  }, [code]);

  return (
    <span className="page-status">
      <div className="tooltip">
        {icon}
        <label className="right">{`${code !== null ? `${code} ` : ""} ${text}${
          loading && " - check in progress"
        }`}</label>
      </div>
    </span>
  );
};
