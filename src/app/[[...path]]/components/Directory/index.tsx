import { getFiles } from "../../services";
import { FileItem } from "./FileItem";

interface DirectoryProps {
  path: string[];
  currentPath: string;
}

export async function Directory({ currentPath }: DirectoryProps) {
  const files = await getFiles(currentPath);

  return (
    <div className="flex flex-col bg-white rounded-md shadow-md">
      <ul>
        {files.map((file) => (
          <FileItem
            key={file.path}
            name={file.name}
            access={file.access}
            hidden={file.hidden}
            type={file.type}
            path={file.path}
          />
        ))}
      </ul>
    </div>
  );
}
