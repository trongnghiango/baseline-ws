const { rimraf } = require('rimraf')
module.exports = {
  // Supports all esbuild.build options
  esbuild: {
    entryPoints: ["./src/server.ts"],
    minify: true,
    target: "ESNext",
    platform: "node",
    format: "cjs",
  },
  // Prebuild hook
  prebuild: async () => {
    console.log("prebuild")
    rimraf.sync("./dist") // clean up dist folder
  },
  // Postbuild hook
  postbuild: async () => {
    console.log("postbuild")
    const cpy = (await import("cpy")).default
    await cpy(
      [
        "src/**/*.graphql", // Copy all .graphql files
        "!src/**/*.{tsx,ts,js,jsx}", // Ignore already built files
      ],
      "dist"
    )
  },
}
