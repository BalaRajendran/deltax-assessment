export const styles = theme => ({
    root: {
        padding: theme.spacing.unit * 0
    },
    margin: {
        margin: theme.spacing.unit * 2
    },
    padding: {
        padding: theme.spacing.unit,
        [theme.breakpoints.down("sm")]: {
            justifyContent: "center",
            display: "-webkit-inline-box"
        },
        [theme.breakpoints.up("md")]: {
            margin: "10px 100px"
        }
    },
    image: {
        width: "100%"
    },
    button: {
        borderRadius: 20,
        textTransform: "none",
        [theme.breakpoints.up("sm")]: {
            width: "50%"
        },
        width: "80%"
    },
    forgetPassword: {
        textTransform: "none"
    },
    buttonProgress: {}
});