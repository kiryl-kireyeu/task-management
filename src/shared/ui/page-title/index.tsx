import Typography from '@mui/material/Typography';

const PageTitle = ({ title }: { title: string }) => {
    return (
        <Typography component="h1" variant="h4">
            {title}
        </Typography>
    );
};

export default PageTitle;
