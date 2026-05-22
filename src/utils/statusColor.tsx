export const getStatusColor = (status: string) => {
    switch (status) {
      case "APPROVED":
        return "bg-green-500/10 text-green-500 hover:bg-green-500/20 border-green-500/20";
      case "REJECTED":
        return "bg-destructive/10 text-destructive hover:bg-destructive/20 border-destructive/20";
      default:
        return "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20 border-yellow-500/20";
    }
  };