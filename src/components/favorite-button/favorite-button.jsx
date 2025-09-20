import { IconButton, Tooltip } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { useFavorites } from 'src/contexts/favorites-context';

// ----------------------------------------------------------------------

export function FavoriteButton({ item, size = 'small', sx, ...other }) {
  const { toggleFavorite, isFavorite } = useFavorites();
  const favorite = isFavorite(item.path);

  const handleToggle = (event) => {
    event.preventDefault();
    event.stopPropagation();
    toggleFavorite(item);
  };

  return (
    <Tooltip title={favorite ? 'Remove from favorites' : 'Add to favorites'}>
      <IconButton
        size={size}
        onClick={handleToggle}
        sx={{
          color: favorite ? 'warning.main' : 'text.disabled',
          '&:hover': {
            color: 'warning.main',
          },
          ...sx,
        }}
        {...other}
      >
        {favorite ? (
          <StarIcon sx={{ fontSize: size === 'small' ? 16 : 20 }} />
        ) : (
          <StarBorderIcon sx={{ fontSize: size === 'small' ? 16 : 20 }} />
        )}
      </IconButton>
    </Tooltip>
  );
}