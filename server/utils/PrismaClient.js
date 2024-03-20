let prismaInstance = null;

function getprismaInstance() {
	if (!prismaInstance) {
		prismaInstance = new PrismaClient();
	}
	return prismaInstance;
}

export default getPrismaInstance;
