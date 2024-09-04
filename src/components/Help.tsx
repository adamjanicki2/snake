import { IconButton, Layer } from "@adamjanicki/ui";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type Props = {
  open: boolean;
  onClose: () => void;
};

const Help = ({ open, onClose }: Props) => {
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
        <h1>Help</h1>
        <p>Info here</p>
      </div>
    </Layer>
  ) : null;
};

export default Help;
