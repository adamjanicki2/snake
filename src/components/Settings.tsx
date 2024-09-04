import { IconButton, Layer } from "@adamjanicki/ui";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GameSettings } from "src/util";

type Props = {
  open: boolean;
  onClose: () => void;
  saveSettings: (settings: GameSettings) => void;
  settings: GameSettings;
};

const Settings = ({ open, onClose }: Props) => {
  return open ? (
    <Layer onClose={onClose}>
      <div className="flex flex-column bg-white br3 pa4 ba b--moon-gray">
        <div className="w-100 flex justify-end">
          <IconButton
            aria-label="close"
            onClick={onClose}
            icon={<FontAwesomeIcon icon={faTimes} />}
          />
        </div>
        <h1>Settings</h1>
        <p>Settings here</p>
      </div>
    </Layer>
  ) : null;
};

export default Settings;
