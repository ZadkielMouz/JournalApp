import { useTheme } from "@emotion/react";
import { ImageList, ImageListItem, useMediaQuery } from "@mui/material";


export const ImageGallery = ({ images }) => {

	// useMediaQuery
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.up('sm'));
	return (
		// <ImageList sx={{ width: '100%', height: 600 }} cols={3} rowHeight={200} gap={50} >
		//   { images.map((image) => (
		//     <ImageListItem key={image} rows={3} sx={{  }}>
		//       <img
		//         src={`${image}`}
		//         // srcSet={`${image}`}
		//         alt="Imagen de la nota"
		//         loading="lazy"
		//       />
		//     </ImageListItem>
		//   )) }
		// </ImageList>

		<>
			{
				!isMobile
					?
					<ImageList
						sx={{ width: '100%', height: 400 }}
						// variant="quilted"
						cols={1}
						rowHeight={200}
					>
						{images.map((image) => (
							<ImageListItem key={image} cols={1} rows={3} >
								<img
									src={`${image}`}
									alt={"imagen de la nota"}
									loading="lazy"
								/>
							</ImageListItem>
						))}
					</ImageList>
					:
					<ImageList
						sx={{ width: '100%', height: 400 }}
						// variant="quilted"
						cols={2}
						rowHeight={200}
					>
						{images.map((image) => (
							<ImageListItem key={image} cols={1} rows={3} >
								<img
									src={`${image}`}
									alt={"imagen de la nota"}
									loading="lazy"
								/>
							</ImageListItem>
						))}
					</ImageList>

			}

		</>

	);
}
