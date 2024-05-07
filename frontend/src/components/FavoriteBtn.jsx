import { toast } from "react-toastify";
import { VscHeart, VscHeartFilled } from "react-icons/vsc";
import axios from "../axios-config";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./FavoriteBtn.css";

const FavoriteBtn = () => {
  const { id } = useParams();

  const [memory, setMemory] = useState(null);
  const [favorite, setFav] = useState(false);

  useEffect(() => {
    const getMemory = async () => {
      const res = await axios.get(`/memories/${id}`);
      setMemory(res.data);
      setFav(res.data.favorite);
    };
    getMemory();
  }, []);

  const handleFavorite = async () => {
    try {
      setFav((prevState) => !prevState);
      const res = await axios.patch(
        `/memories/favorite/${memory._id}`,
        favorite
      );
      toast.success(res.data.msg);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.msg);
    }
  };

  return (
    <div className="fav-btn" onClick={handleFavorite}>
      {!favorite ? (
        <VscHeart className="heart" />
      ) : (
        <VscHeartFilled className="filled" />
      )}
    </div>
  );
};

export default FavoriteBtn;
