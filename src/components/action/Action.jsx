import FavoriteBorderTwoToneIcon from "@mui/icons-material/FavoriteBorderTwoTone";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import BookmarkBorderTwoToneIcon from "@mui/icons-material/BookmarkBorderTwoTone";
import StarOutlineTwoToneIcon from "@mui/icons-material/StarOutlineTwoTone";
import Style from "./action.module.css";
const Action = () => {
  return (
    <div className={Style.actionContainer}>
      <div className={Style.likeAndComment}>
        <FavoriteBorderTwoToneIcon className={Style.icon} />
        <CommentOutlinedIcon className={Style.icon} />
        <StarOutlineTwoToneIcon className={Style.icon} />
      </div>
      <BookmarkBorderTwoToneIcon className={Style.icon} />
    </div>
  );
};

export default Action;
