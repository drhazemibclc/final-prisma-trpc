{pkgs}: {
  channel = "stable-24.05";
  packages = [
    pkgs.nodejs_22
    pkgs.openssl
    pkgs.bun
  ];
  idx.extensions = [
    
  ];
  idx.previews = {
    previews = {
      web = {
        command = [
          "npm"
          "run"
          "dev"
          "--"
          "--port"
          "$PORT"
          "--hostname"
          "0.0.0.0"
        ];
        manager = "web";
      };
    };
  };
}