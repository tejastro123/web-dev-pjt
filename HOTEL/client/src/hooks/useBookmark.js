import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

export const useBookmark = (user, restaurantId) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user && user.bookmarks && restaurantId) {
      setIsBookmarked(user.bookmarks.includes(restaurantId));
    }
  }, [user, restaurantId]);

  const toggleBookmark = async () => {
    if (!user) {
      toast.error("Please login to bookmark");
      return;
    }
    try {
      setLoading(true);
      const res = await axios.put(`http://localhost:5000/api/user/bookmark/${restaurantId}`, {}, {
        headers: { 'x-auth-token': localStorage.getItem('token') }
      });

      if (res.data.bookmarks) {
        setIsBookmarked(res.data.bookmarks.includes(restaurantId));
        toast.success(res.data.msg);
      }
    } catch (error) {
      console.error("Bookmark error", error);
      toast.error("Failed to update bookmark");
    } finally {
      setLoading(false);
    }
  };

  return { isBookmarked, toggleBookmark, loading };
};
